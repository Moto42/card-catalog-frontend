import React from 'react';
import StackAdderForm from './StackAdderForm';
function StackAdder(){

  return ( <div>
    <details>
      <summary>How to Use</summary>
      All your books have to go somewhere. Use this form to add new storage locations to your library.<br/>
      All fields are required.
      <ul>
        <li>
          Name: The display name of this container.  <em>ie: 'The iron banded box.'</em>
        </li>
        <li>
          Building: The building this contaner is found in. <em>ie: National Archives</em>
        </li>
        <li>
          Floor: What floor fo the building this contaner is on. <em>ie: Sub-basement 16.</em>
        </li>
        <li>
          Room: What room this container is found in. <em>ie: Room SB16-5</em>
        </li>
        <li>
          Container: What book-case, closet or box this container is a part of or stored in... <em>ie: Shelf C - Bottom Shelf </em>
        </li>
        <li>
          Cotainer Type: A short description of what kind of container this is. <em>ie: 'wooden box'</em>
        </li>
        <li>
          Description: A more full descripton of the container.<br/>
          <em>Antique wooden box, held closed by 4 iron bands permanently rivited in place around it.</em>
        </li>
      </ul>
    </details>
    <StackAdderForm />
    </div> )
}

export default StackAdder;
