import Image from "next/image";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="xs:w-30.5 relative h-8 w-24.25">
        <Image
          src="/images/logo-large.svg"
          alt="finance"
          fill
          className="object-contain"
          placeholder="empty"
          priority
        />
      </div>
    </div>
  );
}

export function LogoDark() {
  return (
    <>
      <Image
        width={40}
        height={40}
        src="/images/icon-dark.png"
        alt=""
        className="xs:h-10 xs:w-10 h-8 w-8"
        placeholder="empty"
        priority
      />

      <div className="xs:w-30.5 relative h-8 w-24.25">
        <Image
          src="/images/logo-dark.svg"
          alt="finance"
          fill
          className="object-contain"
          placeholder="empty"
          priority
        />
      </div>
    </>
  );
}
