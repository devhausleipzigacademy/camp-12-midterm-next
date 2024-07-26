export default async function Page() {
  const todos: any = await fetch(
    "https://jsonplaceholder.typicode.com/todos"
  ).then((res) => res.json());

  return (
    <div>
      <span>Homepage</span>
      <ul className="grid grid-cols-3 gap-4">
        {todos.map((todo: any) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}
