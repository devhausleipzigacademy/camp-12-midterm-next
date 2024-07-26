export default async function Page() {
  const todos = await fetch("https://jsonplaceholder.typicode.com/todos").then(
    (res) => res.json()
  );

  return (
    <div>
      <span>Homepage</span>
      <ul className="grid grid-cols-3 gap-4">
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}
