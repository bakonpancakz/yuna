// Load Developer Enviroment
try { require("dotenv").config() } catch (_) { }

// Load Core Modules
import "./core/Client"
import "./core/Interaction-Handler"
import "./core/Interaction-Loader"
import "./core/Service-Loader"