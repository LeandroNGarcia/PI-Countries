import { render, cleanup, screen, fireEvent } from "@testing-library/react"
import { describe, test, afterEach, expect } from "vitest";
import HomePage from "../src/components/homePage/HomePage"
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom"
import "@testing-library/user-event"
import store from "../src/redux/store"
import App from "../src/App"
import React from "react";
import userEvent from "@testing-library/user-event";

const handleBackChange = (url) => console.log(url);

describe("Testeo de Componentes", () => {
    afterEach(cleanup);
    test("Deberia renderizarse el componente HomePage", () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <App>
                        <HomePage />
                    </App>
                </BrowserRouter>
            </Provider>
        )
    })
    test("Deberia renderizarse el componente NavBar dentro de HomePage", async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <HomePage handleBackChange={handleBackChange} />
                </BrowserRouter>
            </Provider>
        )
        const navBar = await screen.findByRole("menubar")
        expect(navBar).toBeDefined()
    })
    test("Deberia encontrarse el input search dentro de el componente NavBar", async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <HomePage handleBackChange={handleBackChange} />
                </BrowserRouter>
            </Provider>
        )
        const search = await screen.findByPlaceholderText("Escribe un nombre...")
        expect(search).toBeDefined()
    })
    test("Deberia renderizar HomePage si se da click en el boton de inicio", () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        )
        const button = screen.queryByTestId("wel-mid")
        const user = userEvent.setup()
        user.click(button)
        expect(screen.queryByTitle('Log Out')).toBeDefined()
    })
})