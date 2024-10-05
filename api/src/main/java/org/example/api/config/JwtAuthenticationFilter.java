package org.example.api.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.api.service.JwtService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final HandlerExceptionResolver handlerExceptionResolver;
    private final UserDetailsService userDetailsService;
    private final JwtService jwtService;

    public JwtAuthenticationFilter(HandlerExceptionResolver handlerExceptionResolver, UserDetailsService userDetailsService, JwtService jwtService) {
        this.handlerExceptionResolver = handlerExceptionResolver;
        this.userDetailsService = userDetailsService;
        this.jwtService = jwtService;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
//        System.out.println(authHeader);
        if(authHeader == null || !authHeader.startsWith("Bearer")){
            filterChain.doFilter(request,response);
            return;
        }
        try{
            final String jwt = authHeader.substring(7);
            final String userEmail = jwtService.extractUsername(jwt);
            Authentication auth = SecurityContextHolder.getContext()
                    .getAuthentication();
            if(userEmail != null && auth == null){
                UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);
                if(jwtService.isTokenValid(jwt,userDetails)){
                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
                    authToken.setDetails(new WebAuthenticationDetailsSource()
                            .buildDetails((request)));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        filterChain.doFilter(request,response);
    }
}