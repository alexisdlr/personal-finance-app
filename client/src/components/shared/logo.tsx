import Image from "next/image";

export function Logo() {
  return (
    <>
      <Image
        width={64}
        height={64}
        src="/images/icon-app.webp"
        alt=""
        className="xs:h-16 xs:w-16 h-16 w-16 object-contain"
        placeholder="empty"
        priority
      />

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
    </>
  );
}

export function LogoDark() {
  return (
    <>
      <Image
        width={40}
        height={40}
        src="/images/icon-dark.webp"
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
