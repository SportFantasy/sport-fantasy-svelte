import 'normalize.css'
import './styles/index.scss'
import Root from './Root.svelte'


const app = new Root({
	target: document.body,
});

export default app;
