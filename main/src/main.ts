import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { runMicrotasks } from './topic/microtasks'
import { runAsyncAwait } from './topic/async_await';
import {runIterator} from './topic/iterator';

createApp(App).mount('#app')

// runMicrotasks();
// runAsyncAwait();
runIterator();
