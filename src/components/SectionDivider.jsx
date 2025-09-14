export default function SectionDivider() {
  const repeats = 10; // número de veces que quieres repetir el patrón
  const spacing = 9; // espacio en px entre patrones

  return (
    <div className="flex justify-center items-center h-12 mt-8">
      {Array.from({ length: repeats }).map((_, i) => (
        <img
          key={i}
          src="/trama.svg"
          alt=""
          className="h-full"
          style={{ marginRight: i !== repeats - 1 ? `${spacing}px` : 0 }}
        />
      ))}
    </div>
  );
}
