##[ng-ink](http://caitp.github.io/ng-ink)

###[InK](http://ink.sapo.pt/) web components for [AngularJS](http://angularjs.org/)

**ng-ink** provides a declarative means to use the InK Framework's components, in a fashion which fits in
nicely with the AngularJS environment. It is not a UI library, but rather a wrapper for the behavioural
components of InK.

In conjunction with the InK framework, it should be possible to quickly prototype and build quality web applications,
which make use of advanced user interactions, and are heavily data-driven. 

###Dependencies

- AngularJS
- InK Framework

###Build

**Standard build**

```bash
npm install
grunt build
cat build/ng-ink.js
```

**Single modules**

```bash
npm install
grunt build:draggable
cat build/ng-ink-draggable.js
```

**Custom build**

```bash
npm install
grunt build:draggable:droppable
cat build/ng-ink-custom.js
```

###Example

**Build the example site**

```bash
npm install
grunt example
```

**Build example site and run development server**

```bash
npm install
grunt server
```

###Contributing

Pull requests, bug reports and suggestions are quite welcome.

Code submissions should follow the [Google JavaScript Style Guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml), and each and every new feature or bug fix should incorporate one or more meaningful tests to assist in preventing future regressions.

###License

The MIT License (MIT)

Copyright (c) 2013 Caitlin Potter & Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.