/* @refresh reload */
import "./main.css";
import * as O from "fp-ts/Option";
import logo from "./assets/logo.svg";
import {pipe} from "fp-ts/function";
import {render} from "solid-js/web";
import {Component, JSX} from "solid-js";

const appendQualityAssuranceId = (id: string) => (element: JSX.Element) => {
  const a = element as HTMLDivElement;
  a.dataset.qa = id;

  return a;
};

const header: Component<string> = (description): JSX.Element => (
  <header class="header">
    <img class="logo" src={logo} alt="logo" />
    <p> {description} </p>
  </header>
);

const container: Component<JSX.Element> = (prop) => (
  <div class="container">{prop}</div>
);

const app = pipe(
  "Hello world",
  header,
  container,
  appendQualityAssuranceId("test")
);

pipe(
  document.getElementById("root"),
  O.fromNullable,
  O.fold(
    () => console.error("Not found root element"),
    (root) => render(() => app, root)
  )
);
