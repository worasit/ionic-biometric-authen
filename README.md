# ionic-biometric-authentication

## Generate Application

```shell
ionic start getting-started-iv-react blank --type=react
```

Next, build the application and install and create the platforms:

```shell
cd ./getting-started-iv-react
npm run build
ionic cap add android
ionic cap add ios
```

Finally, in order to ensure that the web application bundle is copied over each build, add `cap copy` to the `build`
script in the `package.json` file
```json
"scripts": {
  "build": "react-scripts build && ionic cap copy",
},
```
