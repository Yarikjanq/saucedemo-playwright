import {
  setWorldConstructor,
  World,
  IWorld,
  IWorldOptions,
} from "@cucumber/cucumber";
import { Browser, BrowserContext, Page } from "@playwright/test";

export interface ICustomWorld extends IWorld {
  browser?: Browser;
  browserContext?: BrowserContext;
  page?: Page;
  debug?: boolean;
  user: { username: string; password: string }; // обов'язково
}

export class CustomWorld extends World implements ICustomWorld {
  browser?: Browser;
  browserContext?: BrowserContext;
  page?: Page;
  debug?: boolean;
  user: { username: string; password: string }; // обов'язково

  constructor(options: IWorldOptions) {
    super(options);
    this.user = { username: "", password: "" }; // ініціалізуємо значення, щоб не було undefined
  }
}

setWorldConstructor(CustomWorld);
