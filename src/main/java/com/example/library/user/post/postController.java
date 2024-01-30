package com.example.library.user.post;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;


@Controller
public class postController {
    @Autowired
    private PostService postService;

    @Autowired
    private PostRepository postRepository;

    @RequestMapping("user/post")
    public String postPage(){
        return "/user/post/post";
    }

    @RequestMapping("user/post/post_form")
    public ResponseEntity<?> writePost(@RequestBody Post post){
        return postService.writePost(post);
    }

    @RequestMapping("/user")
    public String userHome(){
        return "user/home";
    }

    @RequestMapping("/api/posts")
    public ResponseEntity<List<PostDto>> getAllPosts() {
        List<PostDto> posts = postService.getAllPosts();
        return ResponseEntity.ok(posts);
    }

    @DeleteMapping("/api/posts/{id}")
    public ResponseEntity<String> deletePost(@PathVariable Long id) {
        try {
            postRepository.deleteById(Math.toIntExact(id));
            return ResponseEntity.ok("게시물이 삭제되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시물 삭제 중 오류가 발생했습니다.");
        }
    }
}
