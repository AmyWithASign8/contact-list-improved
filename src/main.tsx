import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App.tsx'
import {MantineProvider} from "@mantine/core";
import {ModalsProvider} from "@mantine/modals";
import {BrowserRouter} from "react-router-dom";
import {Notifications} from "@mantine/notifications";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BrowserRouter>
          <MantineProvider withGlobalStyles withNormalizeCSS>
              <ModalsProvider>
                  <Notifications/>
                  <App />
              </ModalsProvider>
          </MantineProvider>
      </BrowserRouter>
  </React.StrictMode>,
)
