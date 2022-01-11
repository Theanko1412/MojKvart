import React from "react";
import Card from "./Card";
import ReactSession from "react-client-session/dist/ReactSession";
import { useHistory } from "react-router";
import District from "./District";
import './Login.css';
import { FaTimes } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

function Districts() {
   const [districts, setDistricts] = React.useState([]);
   const [updated, setUpdated] = React.useState(new Date());
   const role = ReactSession.get(ReactSession.get("username"));
   const history = useHistory();

   function deleteDistrict(id) {
      const options = {
         method: 'DELETE',
      };
      fetch(`/districts/${id}`, options)
         .then(response => {
            /* console.log(response); */
            if (!response.ok) {
               console.log(response.body);
            } else {
               console.log("deleted");
               setUpdated(new Date());
            }
         });
   }

   React.useEffect(() => {
      fetch('/districts')
         .then(data => data.json())
         .then(districts => setDistricts(districts))
   }, [updated]);


   if (role === "ADMIN") {
      return (
         <Card title='Kvartovi'>
            <div className='StreetList'>
               {districts.map(function (district) {
                  if (district.id !== -1) {
                     return ([
                        <div className="wrapper">
                           <div className="inner">
                              <District key={district.id} district={district} />
                           </div>
                           <div className="inner">
                              <MdDelete style={{color:"red" ,cursor:"pointer"}} onClick={() => deleteDistrict(district.id)}></MdDelete>
                           </div>
                        </div>
                     ]);  
                  }
               })}
            </div>
            <div className='Login'>
               <button className='button' type="button" onClick={() => {history.push("/kvartovi/novi")}}>Dodaj Kvart</button>
            </div>
         </Card>
      );
   } 
   else {
      history.push("/");
   }
}

export default Districts;