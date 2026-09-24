# React Hooks Tips & Tricks

React Hooks fundamentally changed how we write React components. Here are some practical tips and patterns I've learned along the way.

## 1. Extract Logic into Custom Hooks

Don't reinvent the wheel! Extract common logic into reusable custom Hooks.

```javascript
// useLocalStorage hook
function useLocalStorage(key, initialValue) {
    const [stored, setStored] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch {
            return initialValue;
        }
    });

    const setValue = (value) => {
        setStored(value);
        localStorage.setItem(key, JSON.stringify(value));
    };

    return [stored, setValue];
}
```

## 2. useCallback vs useMemo

### useCallback
Used to memoize **functions**:

```javascript
const handleClick = useCallback(() => {
    doSomething(id);
}, [id]);
```

### useMemo
Used to memoize **computed values**:

```javascript
const expensiveValue = useMemo(() => {
    return computeExpensive(data);
}, [data]);
```

## 3. Cleanups in useEffect

Always clean up your side effects to prevent memory leaks!

```javascript
useEffect(() => {
    const subscription = api.subscribe(handler);
    
    // Cleanup function
    return () => {
        subscription.unsubscribe();
    };
}, []);
```

## 4. Lazy Initial State

For expensive initial calculations:

```javascript
// ❌ Called on every single render
const [state, setState] = useState(expensiveComputation());

// ✅ Only called on the initial mount
const [state, setState] = useState(() => expensiveComputation());
```

## 5. Using useRef for Mutable Values

When you need a value that persists across re-renders without triggering a re-render when changed:

```javascript
const timerRef = useRef(null);

useEffect(() => {
    timerRef.current = setInterval(tick, 1000);
    return () => clearInterval(timerRef.current);
}, []);
```

## 6. Custom Hook Pattern: useFetch

```javascript
function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(setData)
            .catch(setError)
            .finally(() => setLoading(false));
    }, [url]);

    return { data, loading, error };
}
```

## Conclusion

Hooks make React code cleaner and much easier to maintain. Mastering these patterns will help you write better, more idiomatic React code! 💪
