package com.example.library.user.post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;



    public ResponseEntity<?> writePost(Post post){
        System.out.println(post);
        postRepository.save(post);
        return ResponseEntity.ok("글 작성 완료");
    }


    public List<PostDto> getAllPosts() {
        List<Post> posts = (List<Post>) postRepository.findAll();
        return posts.stream()
                .map(post -> new PostDto(
                        post.getId(),
                        post.getTitle(),
                        post.getContent(),
                        post.getUser().getName(),
                        post.getCreatedAt()))
                .collect(Collectors.toList());
    }
}
