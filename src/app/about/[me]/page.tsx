export default function Page({ params }: { params: { me: string } }) {
  return (
    <div>
      <span>{params.me}</span>
    </div>
  );
}
