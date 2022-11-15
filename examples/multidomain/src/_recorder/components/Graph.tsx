import * as React from 'react';
import Tr from 'react-d3-tree';
import { useTrigger } from 'src/_redux/useTrigger';

const orgChart = {
  name: 'CEO',
  children: [
    {
      name: 'Manager',
      attributes: {
        department: 'Production',
      },
      children: [
        {
          name: 'Foreman',
          attributes: {
            department: 'Fabrication',
          },
          children: [
            {
              name: 'Worker',
            },
          ],
        },
        {
          name: 'Foreman',
          attributes: {
            department: 'Assembly',
          },
          children: [
            {
              name: 'Worker',
            },
          ],
        },
      ],
    },
  ],
};

export const Graph = () => {
  const trigger = useTrigger();

  return (
    <div>
      <div id='treeWrapper' style={{ width: '50em', height: '20em' }}>
        <Tr data={orgChart} />
      </div>
      <button onClick={() => trigger('openPopup', 'close', null)}></button>
    </div>
  );
};
