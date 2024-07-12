import { LinkProps } from '@chakra-ui/react';

export interface ITextLink extends LinkProps {
  readonly title?: string;
  readonly link: any;
  
}
