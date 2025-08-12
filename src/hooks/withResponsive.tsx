// withResponsiveSize.tsx
import React from "react";
import { useWindowDimensions } from "react-native";

// Props for wrapped component (must accept size)
type WithSizeProps = { size: number };

const withResponsiveSize = <
  P extends { label: string | number } & Partial<WithSizeProps>,
>(
  WrappedComponent: React.ComponentType<P>,
) => {
  return function ResponsiveBall(
    props: Omit<P, "size"> & { sizePercent?: number; maxSize?: number },
  ) {
    // Get window dimensions to calculate responsive size
    const { width } = useWindowDimensions();
    const { sizePercent = 14, maxSize = 100, ...restProps } = props;

    const dynamicSize = (width * sizePercent) / 100;
    const size = Math.min(dynamicSize, maxSize);

    // Pass size to wrapped component
    return <WrappedComponent {...(restProps as P)} size={size} />;
  };
};

export default withResponsiveSize;
