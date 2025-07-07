import React from 'react';

export default function IconButton({ Icon: IconComponent, Variant, Size, Click, Title, hoverVariant = "nuetral" }) {
  const variantType = {
    fail: "text-red-500",
    nuetral: "text-black-500",
    success: "text-green-500",
  };
  const sizeClasses = {
    md: "h-6 w-6",
    sm: "h-6 w-6",
    lg: "h-6 w-6"
  };
  return (
    <>
      <button onClick={Click} title={Title} aria-label={Title}>
        {IconComponent && (
          <IconComponent className={`${variantType[Variant]} ${sizeClasses[Size]} hover:${variantType[hoverVariant]} `} />
        )}
      </button>
    </>
  );
}
