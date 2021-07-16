server port: 4001\
auth server port: 4002

## server routes:

| route                             | method | access  | request               | response                       |
| :-------------------------------- | :----: | :-----: | --------------------- | ------------------------------ |
| /api/user/userInfo                |  GET   | private |                       | ``` { "username", "email"} ``` |
| /api/user/update-profile/username |  POST  | private | ``` { "username"} ``` |                                |
| /api/user/update-profile/email    |  POST  | private | ``` { "email"} ```    |                                |
| /api/user/update-profile/password |  POST  | private | ``` { "password"} ``` |                                |

## auth server routes:

| route              | method | access | request                                   | response                                                                   |
| :----------------- | :----: | :----: | ----------------------------------------- | -------------------------------------------------------------------------- |
| /api/auth/login    |  POST  | public | ``` {"email", "password"} ```             | ``` { "accessToken", "refreshToken", "userId", "email", "displayName"} ``` |
| /api/auth/register |  POST  | public | ``` {"email", "username", "password"} ``` | ``` { "message: "Register success"} ```                                    |
| /api/auth/logout   |  POST  | public | ``` {"token": "refreshToken"} ```         | ``` { "OK"} ```                                                            |
| /api/auth/token    |  POST  | public | ``` {"token": "refreshToken"} ```         | ``` { "accessToken"} ```                                                   |


## TODO:
- [ ] TODO
