import React from "react";
import { connect } from "react-redux";
import { startLogin } from "../actions/auth";
import Particles from "react-particles-js";
import { fail } from "assert";

// const P = Particles.default;

export const LoginPage = ({ startLogin }) => (
  <div className="login-page">
    <div className="login-page-content">
      <h1 id="login-page-text">Store Management Application</h1>
      <div>
        <button id="btn-login" onClick={startLogin}>
          Login with Google
        </button>
      </div>
    </div>
    <Particles
      params={{
        particles: {
          number: {
            value: 100,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: "#ffffff"
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#000000"
            },
            polygon: {
              nb_sides: 5
            }
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 6,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onMouseEnter: {
                enable: true,
                mode: "repulse"
              },
              onClick: {
                enable: true,
                mode: "push"
              },
              resize: true
            },
            modes: {
              grab: {
                distance: 400,
                line_linked: {
                  opacity: 1
                }
              },
              repulse: {
                distance: 200,
                duration: 0.4
              },
              push: {
                particles_nb: 4
              },
              remove: {
                raricles_nb: 2
              }
            }
          },
          retina_detect: true
        }
      }}
      style={{
        display: "flex",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%"
      }}
    />
  </div>
);

const mapDispatchToProps = dispatch => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
