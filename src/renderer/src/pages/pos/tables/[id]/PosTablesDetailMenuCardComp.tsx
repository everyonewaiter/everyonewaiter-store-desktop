interface PosTablesDetailMenuCardCompProps {
  name: string;
  price: number;
  image?: string;
}

export default function PosTablesDetailMenuCardComp({
  name,
  price,
  image,
}: PosTablesDetailMenuCardCompProps) {
  return (
    <div className="relative aspect-[270/340] overflow-hidden rounded-3xl border border-gray-600">
      <img src={image || "./src/assets/images/pos-bg.jpg"} className="h-full w-full object-cover" />
      <div className="absolute bottom-0 flex w-full flex-col items-center justify-center gap-2 bg-white px-6 py-4">
        <span className="text-gray-0 text-lg leading-[27px] font-normal">{name}</span>
        <strong className="text-gray-0 text-2xl leading-8 font-semibold">
          {price.toLocaleString()}원
        </strong>
      </div>
    </div>
  );
}
