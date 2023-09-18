import {Navigate, Route, Routes} from "react-router";
import {observer} from "mobx-react-lite";
import AuthPage from "./pages/Auth";
import ContactListPage from "./pages/ContactList";
import AuthStore from "./store/user-auth-store"
import {useEffect} from "react";

export const App = observer(() => {
    const { isAuth, checkAuth } = AuthStore;
    useEffect(() => {
        checkAuth()
    }, [])
  return (
      <Routes>
          {!isAuth ? (
              <>
                  <Route path={"/auth"}>
                      <Route path={"reg"} element={<AuthPage />} />
                      <Route path={"login"} element={<AuthPage />} />
                  </Route>
                  <Route path="*" element={<Navigate to={"/auth/login"} />} />
              </>
          ) : (
              <>
                  <Route path={"/"} >
                      <Route index element={<ContactListPage />} />
                  </Route>
                  <Route path="*" element={<Navigate to={"/"} />} />
              </>
          )}
      </Routes>
  )
})
