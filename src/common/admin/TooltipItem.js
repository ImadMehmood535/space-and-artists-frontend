import React, { useState } from 'react';
import { Button, Tooltip } from 'reactstrap';

const TooltipItem = ({ id, item }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <span>
      <Button className="ml-1" color="default p-0" id={`tooltip_${id}`}>
        {item.text}
      </Button>
      <Tooltip
        placement={item.placement}
        isOpen={tooltipOpen}
        target={`tooltip_${id}`}
        toggle={() => setTooltipOpen(!tooltipOpen)}
      >
        {item.body}
      </Tooltip>
    </span>
  );
};
export default TooltipItem;
