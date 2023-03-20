import passportJwt, { StrategyOptions } from "passport-jwt";
import passport from "passport";
import validateEnv from "@utils/validate-env";
import AuthService from "@core/auth/auth.service";

validateEnv();
const options: StrategyOptions = {
  algorithms: ["HS256"],
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.TOKEN_SECRET,
};

const JwtStrategy = passportJwt.Strategy;
const PassportStrategy = () => {
  passport.use(
    new JwtStrategy(options, async (jwt_payload, done) => {
      try {
        const userService = new AuthService();
        const user = await userService.findUserOrFail({ id: jwt_payload.sub });
        if (user) return done(null, user);
        return done(null, false);
      } catch (err) {
        done(err, false);
      }
    }),
  );
};

export default PassportStrategy;
