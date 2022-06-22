import { ReactNode, createContext, useState, useEffect } from 'react';
// hooks
import useResponsive from '../hooks/useResponsive';

// ----------------------------------------------------------------------

export type CollapseDrawerContextProps = {
  isCollapse?: boolean;
  collapseClick: boolean;
  collapseHover: boolean;
  onHoverEnter: VoidFunction;
  onHoverLeave: VoidFunction;
};

const initialState: CollapseDrawerContextProps = {
  collapseClick: false,
  collapseHover: false,
  onHoverEnter: () => {},
  onHoverLeave: () => {}
};

const CollapseDrawerContext = createContext(initialState);

type CollapseDrawerProviderProps = {
  children: ReactNode;
};

function CollapseDrawerProvider({ children }: CollapseDrawerProviderProps) {
  const isDesktop = useResponsive('up', 'lg');

  const [collapse, setCollapse] = useState({
    click: false,
    hover: false
  });

  useEffect(() => {
    if (!isDesktop) {
      setCollapse({
        click: false,
        hover: false
      });
    }
  }, [isDesktop]);

  const handleHoverEnter = () => {
    if (collapse.click) {
      setCollapse({ ...collapse, hover: true });
    }
  };

  const handleHoverLeave = () => {
    setCollapse({ ...collapse, hover: false });
  };

  return (
    <CollapseDrawerContext.Provider
      value={{
        isCollapse: collapse.click && !collapse.hover,
        collapseClick: collapse.click,
        collapseHover: collapse.hover,
        onHoverEnter: handleHoverEnter,
        onHoverLeave: handleHoverLeave
      }}
    >
      {children}
    </CollapseDrawerContext.Provider>
  );
}

export { CollapseDrawerProvider, CollapseDrawerContext };
