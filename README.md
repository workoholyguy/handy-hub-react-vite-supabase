# Web Development Final Project - **HandyHub**

Submitted by: **Omar Madjitov**

This web app: **is a community-driven platform that connects DIY enthusiasts and professional handymen. It allows users to post questions about home improvement, receive expert answers, and earn rewards by sharing knowledge. HandyHub fosters collaboration and empowers users to tackle projects effectively.**

Time spent: **40+ hours spent in total**

## Required Features

The following **required** functionality is completed:

- [x] **A create form that allows the user to create posts**
- [x] **Posts have a title and optionally additional textual content and/or an image added as an external image URL**
- [x] **A home feed displaying previously created posts**
- [x] **By default, the time created, title, and number of upvotes for each post is shown on the feed**
- [x] **Clicking on a post shall direct the user to a new page for the selected post**
- [x] **Users can sort posts by either their created time or upvotes count**
- [x] **Users can search for posts by title**
- [x] **A separate post page for each created post, where any additional information is shown is linked whenever a user clicks a post**
- [x] **Users can leave comments underneath a post on the post's separate page**
- [x] **Each post should have an upvote button on the post's page. Each click increases its upvotes count by one and users can upvote any number of times**
- [x] **A previously created post can be edited or deleted from its post page**

The following **optional** features are implemented:

- [x] Users can only edit and delete posts or delete comments by entering a secret key, which is set by the user during post creation.
- [ ] Upon launching the web app, the user is assigned a random user ID. It will be associated with all posts and comments that they make and displayed on them.
- [ ] Users can repost a previous post by referencing its post ID. On the post page of the new post, the referenced post is displayed and linked, creating a thread.
- [ ] Users can customize the interface of the web app.
- [ ] Users can share and view web videos.
- [x] Users can set flags while creating a post. Then users can filter posts by flags on the home feed.
- [ ] Users can upload images directly from their local machine as an image file.
- [ ] Display a loading animation whenever data is being fetched.

The following **additional** features are implemented:

- [x] **User Authentication**: Users can sign up, sign in, and manage their accounts securely using Supabase authentication.
- [x] **Private Routes**: Non-authenticated users are redirected to the sign-in page when attempting to access restricted features.
- [x] **Upvote and Rewards System**: Users can upvote helpful answers, and answer contributors earn rewards for accepted answers.
- [x] **Responsive Design**: The app is mobile-friendly and works seamlessly across devices.
- [x] **Enhanced Search**: Users can search for questions by title and sort them by upvotes or recency.
- [x] **Monetary Transactions**: Users spend tokens to post questions and earn them for contributing accepted answers.

## Video Walkthrough

Here's a walkthrough of implemented user stories:

![Video Walkthrough](http://i.imgur.com/link/to/your/gif/file.gif)

<!-- Replace this with whatever GIF tool you used! -->
GIF created with ...  
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

### Challenges:
1. **Implementing Authentication**:
   - Managing Supabase authentication flows and handling state changes dynamically was challenging.
   - Debugging common errors like `422 Unprocessable Content` required careful configuration of Supabase settings.

2. **Responsive Design**:
   - Ensuring the app looked good on various screen sizes required thorough testing and CSS optimization.

3. **Sorting and Filtering**:
   - Building a robust search and sort feature that scales efficiently with a growing number of posts.

4. **State Management**:
   - Managing state across components, especially with nested routes and forms, required precise React hooks.

### Future Enhancements:
- Integrate file uploads for image posting directly from the user’s local machine.
- Add social media sharing functionality for posts.
- Build an admin dashboard to manage flagged or inappropriate content.

## License

    Copyright 2024 Omar Madjitov

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.