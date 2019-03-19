import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// import AnimatedToggle from './useAnimatedToggle/AnimatedToggle';
// import Simple from './useDelay/Simple';
// import SimpleManyToOne from './Fiber/SimpleManyToOne';
// import SimpleManyToOne from './createMorphed/SimpleManyToOne';
import Simple from './Fiber/Simple';
// import Router from './Router';
// import Multiple from './Multiple';

require('module-alias/register');

// ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<Multiple />, document.getElementById('root'));
// ReactDOM.render(<SimpleManyToOne />, document.getElementById('root'));
ReactDOM.render(<Simple />, document.getElementById('root'));
