# useDelay utility for handling animation states

Similar to transition group but for object and lists.

## Installation

`npm i use-delay -S`

## States

* `entering`
* `entered`
* `exiting`
* `exited`

# Example

```jsx
const Component = () => {
  const [list, setList] = useState(["one", "two", "three"]);
  const dList = useDelay(list);

  const removeOne = () => setList(["two", "tree"]);

  return (
    <div>
      <ul>
        {dList.map(({ item, state, t }) => {
          return (
            <li key={item.key} style={{ opacity: t }}>
              {item.name} {state}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
```
