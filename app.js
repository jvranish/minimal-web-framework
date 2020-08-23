import { html, render }  from './lib/uhtml/uhtml.js';
import { MiniRedux } from './lib/mini-redux.js';

const Button = ({ onClick, text}) =>
  html`<button class="siimple-btn" onClick=${onClick}>${text}</button>`;

const Card = ({header, body, footer}) =>
  html`<div class="siimple-card">
        ${header ? html`<div class="siimple-card-header"> ${header} </div>` : null}
      <div class="siimple-card-body">
         ${body}
      </div>
        ${footer ? html`<div class="siimple-card-footer"> ${footer} </div>` : null}
      </div>`;

function App({ count }, dispatch) {
  return html`
      <div class="app">
        <div class="siimple-content theme-content siimple-content--large">
          ${Card({
            header: "A Counter!",
            body: `Count: ${count}`,
            footer: html`${Button({
                onClick: () => dispatch({ type: "INCREMENT" }),
                text: "Increment"
              })}
              ${Button({
                onClick: () => dispatch({ type: "DECREMENT" }),
                text: "Decrement"
              })}`
          })}
        </div>
      </div>
    `;
}

const initial_state = { count: 0 };

// reducer
function counter({ count }, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: count + 1 };
    case "DECREMENT":
      return { count: count - 1 };
    default:
      return { count };
  }
}

function renderActor(app, root_node_id = "root") {
  const ROOT_NODE = document.getElementById(root_node_id);
  return (state, prev, dispatch) => {
    render(ROOT_NODE, app(state, dispatch));
  }
}

const actors = [renderActor(App)];

MiniRedux.start(counter, initial_state, actors);
