# References:
1. Login box visuals: https://codepen.io/amit0009/pen/ZEaygxa
1. AuthContext: https://www.mikealche.com/software-development/how-to-implement-authentication-in-next-js-without-third-party-libraries

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

**Create a new `.env` folder with the same contents as .env.example in the frontend directory**

If you are using VSCode, download the tailwind css extension for code suggestions!

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Developer guide

**How frontend is linked to backend**

Flow is as such:
1. **Comonent level**: In respective component, one or more text fields keep track of react state variable. On action button eg. `Submit` button, the button executes the `onClick` function. `onClick` function take the react state variable and calls `fetchPost`, `fetchGet` etc. from `frontend/utils/apiHelpers.ts`
2. **apiHelper level**: Depending on what you want the button from the component level to do, `fetchGet`, `fetchPost`, `fetchPut`, or `fetchDelete` is called. At this stage and level, `url` should be the frontend's `/api/<service>` page, and the `data` should be the respective data you want to pass on to the backend/ micro service. The fetch<ACTION> is passed on to the frontend routing
3. **Frontend routing level**: The previous level would decide which frontend route to query. The frontend routes are in `./pages/api`. The frontend route page uses its handler to handle `POST`, `GET`, `PUT`, `DELETE` requests, and passes it back to the **apiHelper level**, but now it specifies the url of the respective backend service. This url is configured in `.env`
4. **apiHelper level**: `fetchGet`, `fetchPost`, `fetchPut`, or `fetchDelete` is called, depending on the nature of the previous levels. A  `POST`, `GET`, `PUT` or `DELETE` request is then passed on to the backend service with the url specified in the previous level
5. **Comonent level**: Handles response with the success alert or error with the error message alert



