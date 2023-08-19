import { rest } from "msw";

const baseURL = "https://drf-api-rec.herokuapp.com/";

export const handlers = [
  rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
    return res(
      ctx.json({
        pk: 6,
        username: "Rosa",
        email: "",
        first_name: "",
        last_name: "",
        profile_id: 6,
        profile_image:
          "https://res.cloudinary.com/deq1lnzm6/image/upload/v1/media/images/41_vz38ib",
      })
    );
  }),
  rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
