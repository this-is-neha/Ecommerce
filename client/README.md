# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list


<!-- 
useState hook
to maintain a state in any react funtdional componrnnt
useState()
useState hook return two data ,a.state data
b. stateFunction to manipulate  stte data in an array

Fffect Hook 
yo listen or execute /render the component  whenever there is any change on any state /dependenct defined in the component 
use Effect() is the effect hokk 
there are 3 major implementation in the useEffect hook
useEffect(()=>{

})==> this hook executes on any change of the component
 useEffect (()=>{

 },[])==> this hook executes 



 -->


 ###
 Cookie gets destoyed when mature
 Cookie has a limitation of 50 per domain
 cookie are alwayv sstored in key value pair but as a  string data 
 
 <!-- document .cookie="key=value" -->

 <!-- Local storage 
 localstprahe.setItem('key',value as string)
 localstring.getitem("key")
 loaclstring
 
  -->