import streamDeck, { LogLevel } from "@elgato/streamdeck";

import { IncrementCounter } from "./actions/increment-counter";
import { CPUUsage } from "./actions/cpu-usage";
import { MemUsage } from "./actions/mem-usage";

// We can enable "trace" logging so that all messages between the Stream Deck, and the plugin are recorded. When storing sensitive information
streamDeck.logger.setLevel(LogLevel.TRACE);
streamDeck.logger.info("Plugin started");

// Register the increment action.
streamDeck.actions.registerAction(new IncrementCounter());

// Register the increment action.
streamDeck.actions.registerAction(new CPUUsage());

// Register the increment action.
streamDeck.actions.registerAction(new MemUsage());

// Finally, connect to the Stream Deck.
streamDeck.connect();
