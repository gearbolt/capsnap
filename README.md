# capsnap
Mass captcha collection made easy for many use cases.

![term](https://i.imgur.com/2BJanvl.png)

### Installation

capsnap requires [Node.js](http://nodejs.org/).

Setup:

```sh
$ git clone https://github.com/dzt/capsnap.git
$ cd capsnap
$ npm install # or sudo npm install
```

Configure information inside the `config.example.json` be sure to rename it to `config.json` or simply run `mv config.example.json config.json` (macOS & Windows) when you're done.

Run After Setup:

```sh
$ npm run
```

# Config

### Important Fields/Attributes
* **config**{ Object }:
  * **config.sitekey** {  _String_ }: Sitekey specific to URL/Page.
  * **config.pageurl** {  _String_ }: Set a page URL to where you want to have your tokens solved.
  * **config.injectToBot.enabled** {  _Boolean_ }: Enable Bot Injection.
  * **config.injectToBot.postURL** {  _String_ }: Designated URL to send tokens over to your bot.
  * **config.database.filename** {  _String_ }: Designated location and filename to where you want to save your data store.
  * **config.2cap_keys** {  _Array_ }: Collection of 2Captcha Keys and Settings.
  * **config.anticap_keys** {  _Array_ }: Collection of AntiCaptcha Keys and Settings.


### Who

Written by <a href="http://petersoboyejo.com/">@dzt</a>, made better by you.


## License

```
The MIT License (MIT)

Copyright (c) 2017 Peter Soboyejo <http://petersoboyejo.com/>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
