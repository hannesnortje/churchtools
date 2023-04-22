import {
  churchtoolsClient,
  activateLogging,
  LOG_LEVEL_INFO,
  errorHelper,
} from "@churchtools/churchtools-client";
import axiosCookieJarSupport from "axios-cookiejar-support";
import tough from "tough-cookie";

const loginFile = () => {
  // Settings: Please set accordingly to run this demo.
  const SETTINGS = {
    BASEURL: "https://jobs.church.tools",
    USERNAME: "churchtools",
    PASSWORD: "Jobs2022",
    // if TOKEN is set, the TOKEN is used to log in instead of USERNAME/PASSWORD
    TOKEN: null,
    //"rIOWnmodkUKuOOyZ5YdoXiPi5H4MXghTKAnwlSwnU70FyseEBAPS1AzuxK1uf2Ntr6HyZhHeyJOAe5QEMYb5nAED0hgil1WL6EOWtSMnxv5YeIUOch3z46XT5ADc5lKsbZRqzPQOXuBHj6iTsbKSCmygrwynHlOetOsIhfDWpe2rRX1x77dZ9TaGOIiFZbiY9MUGbPOLFnn3IdkQazSzJVcLLD1ZZKdylvWXjbyw7aiQtWkQ3U0Ks7HIF3vEjOQZ",
  };

  // End of Settings

  function initChurchToolsClient() {
    churchtoolsClient.setCookieJar(axiosCookieJarSupport.wrapper, new tough.CookieJar());
    churchtoolsClient.setBaseUrl(SETTINGS.BASEURL);
    // Logging can be activated to either LOG_LEVEL_NONE (no logging at all, default),
    // LOG_LEVEL_DEBUG (outputs every request and response including request/response data)
    // LOG_LEVEL_INFO (outputs every request and response, but only method and URL) or
    // LOG_LEVEL_ERROR (outputs only errors).
    activateLogging(LOG_LEVEL_INFO);
  }

  //
  function login() {
    // if we have a login token, we use this
    if (SETTINGS.TOKEN) {
      churchtoolsClient.setUnauthorizedInterceptor(SETTINGS.TOKEN);
      // we call /api/contactlabels here, as an example. Any api call will trigger an automatic login with TOKEN
      return churchtoolsClient.get("/contactlabels").then(() => {
        console.log("Login with token successful.");
        return true;
      });
    }

    // no login token => use username / password
    return churchtoolsClient
      .post("/login", {
        username: SETTINGS.USERNAME,
        password: SETTINGS.PASSWORD,
      })
      .then(() => {
        console.log("Login successful.");
        return true;
      });
  }

  initChurchToolsClient();
  login()
    .then(() => {
      return churchtoolsClient.get("/whoami").then((whoAmI) => {
        console.log(`Hello ${whoAmI.firstName}!`);
      });
    })
    .catch((error) => {
      // getTranslatedErrorMessage returns a human readable translated error message
      // from either a full response object, response data or Exception or Error instances.
      console.error(errorHelper.getTranslatedErrorMessage(error));
    });
};

export default loginFile;
