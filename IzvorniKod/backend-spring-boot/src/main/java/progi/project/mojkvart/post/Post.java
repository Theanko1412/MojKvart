package progi.project.mojkvart.post;

import com.fasterxml.jackson.annotation.JsonIgnore;
import progi.project.mojkvart.thread.PostThread;
import progi.project.mojkvart.account.Account;

import javax.persistence.*;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "post")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long id;

    @Column(name = "post_content", length = 5000)
    private String content;

    @Column(name = "post_datetime")
    private LocalDateTime dateTime;

    @Column(name = "thread_id_saved")
    private Long threadId;

    @Column(name = "post_reply_id", nullable = true)
    private Long replyId;

    public PostThread getThread() {
        return thread;
    }

    public void setThread(PostThread thread) {
        this.thread = thread;
    }

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "thread_id")
    private PostThread thread;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;

    /* Bi-directional relationship may not be necessary though,
     as we probably don't want to store all replies to a post in this list.*/
    @OneToMany(mappedBy = "parentPost")
    private List<Post> replyPosts;

    @ManyToOne
    @JoinColumn(name = "post_id", insertable = false, updatable = false)
    private Post parentPost;

    public Post() {

    }

    public Post(Long id, String content, LocalDateTime dateTime, Long replyId, PostThread thread, Account account) {
        this.id = id;
        this.content = content;
        this.dateTime = dateTime;
        this.replyId = replyId;
        this.thread = thread;
        this.account = account;
    }

    public Long getThreadId() {
        return threadId;
    }

    public void setThreadId(Long threadId) {
        this.threadId = threadId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public Long getReplyId() {
        return replyId;
    }

    public void setReplyId(Long replyId) {
        this.replyId = replyId;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    @Override
    public String toString() {
        return super.toString();
    }
}
