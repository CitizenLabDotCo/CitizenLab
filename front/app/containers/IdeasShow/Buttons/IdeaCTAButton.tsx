import React from 'react';
import Button from 'components/UI/Button';
import { IconNames } from 'cl2-component-library';

interface Props {
  className?: string;
  buttonText: string;
  iconName?: IconNames;
  onClick?: () => void;
  ariaExpanded?: boolean;
}

const IdeaCTAButton = ({
  className,
  buttonText,
  iconName,
  onClick,
  ariaExpanded,
}: Props) => {
  return (
    <Button
      className={className}
      icon={iconName}
      iconAriaHidden={true}
      buttonStyle="white"
      fontWeight="500"
      onClick={onClick}
      ariaExpanded={ariaExpanded}
    >
      {buttonText}
    </Button>
  );
};

export default IdeaCTAButton;
