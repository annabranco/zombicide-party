import React, { useState } from 'react';
import SoundBlock from '../SoundBlock';
import { SelectorArea } from '../styles';
import {
  CharacterSheet,
  CharItems,
  CharName,
  Item,
  SelectorModal,
  ItemWrapper
} from './styles';
import SelectionItem from '../../ItemSelector';
import { WEAPONS } from '../../../utils/itemsReference';

const PlayersSection = () => {
  const [player, changePlayer] = useState('Amy');
  const [items, updateItems] = useState(['Pistol', 'BaseballBat']);
  const [slot, selectSlot] = useState();

  const changeItems = selectedItem => {
    const newItems = [...items];
    newItems[slot - 1] = selectedItem;
    updateItems(newItems);
    selectSlot();
  };

  return (
    <CharacterSheet>
      <CharName>Amy</CharName>
      <CharItems>
        {items.map((item, index) => (
          <ItemWrapper key={`${'BaseballBat'}-${index + 1}`}>
            <Item>
              <SoundBlock name={item} img={WEAPONS[item].img} type="weapons" />
            </Item>
            <button type="button" onClick={() => selectSlot(index + 1)}>
              CHANGE
            </button>
          </ItemWrapper>
        ))}
      </CharItems>
      {slot && (
        <SelectorModal>
          <SelectorArea columns={6}>
            <SelectionItem
              name={WEAPONS.BaseballBat.name}
              img={WEAPONS.BaseballBat.img}
              onSelect={changeItems}
              type="weapons"
            />
            <SelectionItem
              name={WEAPONS.Chainsaw.name}
              img={WEAPONS.Chainsaw.img}
              onSelect={changeItems}
              type="weapons"
            />
            <SelectionItem
              name={WEAPONS.Crowbar.name}
              img={WEAPONS.Crowbar.img}
              onSelect={changeItems}
              type="weapons"
            />
            <SelectionItem
              name={WEAPONS.EvilTwins.name}
              img={WEAPONS.EvilTwins.img}
              onSelect={changeItems}
              type="weapons"
            />
            <SelectionItem
              name={WEAPONS.FireAxe.name}
              img={WEAPONS.FireAxe.img}
              onSelect={changeItems}
              type="weapons"
            />
            <SelectionItem
              name={WEAPONS.Katana.name}
              img={WEAPONS.Katana.img}
              onSelect={changeItems}
              type="weapons"
            />
            <SelectionItem
              name={WEAPONS.MasShotgun.name}
              img={WEAPONS.MasShotgun.img}
              onSelect={changeItems}
              type="weapons"
            />
            <SelectionItem
              name={WEAPONS.Machete.name}
              img={WEAPONS.Machete.img}
              onSelect={changeItems}
              type="weapons"
            />
            <SelectionItem
              name={WEAPONS.Molotov.name}
              img={WEAPONS.Molotov.img}
              onSelect={changeItems}
              type="weapons"
            />
            <SelectionItem
              name={WEAPONS.Pan.name}
              img={WEAPONS.Pan.img}
              onSelect={changeItems}
              type="weapons"
            />
            <SelectionItem
              name={WEAPONS.Pistol.name}
              img={WEAPONS.Pistol.img}
              onSelect={changeItems}
              type="weapons"
            />
            <SelectionItem
              name={WEAPONS.Rifle.name}
              img={WEAPONS.Rifle.img}
              onSelect={changeItems}
              type="weapons"
            />
            <SelectionItem
              name={WEAPONS.SawedOff.name}
              img={WEAPONS.SawedOff.img}
              onSelect={changeItems}
              type="weapons"
            />
            <SelectionItem
              name={WEAPONS.Shotgun.name}
              img={WEAPONS.Shotgun.img}
              onSelect={changeItems}
              type="weapons"
            />
            <SelectionItem
              name={WEAPONS.SubMG.name}
              img={WEAPONS.SubMG.img}
              onSelect={changeItems}
              type="weapons"
            />
          </SelectorArea>
        </SelectorModal>
      )}
      ;
      {/* <SelectorArea columns={6}>
        <SoundBlock name="BaseballBat" img={BaseballBat} type="weapons" />
        <SoundBlock name="Chainsaw" img={Chainsaw} type="weapons" />
        <SoundBlock name="Crowbar" img={Crowbar} type="weapons" />
        <SoundBlock name="EvilTwins" img={EvilTwins} type="weapons" />
        <SoundBlock name="FireAxe" img={FireAxe} type="weapons" />
        <SoundBlock name="Katana" img={Katana} type="weapons" />
        <SoundBlock name="MasShotgun" img={MasShotgun} type="weapons" />
        <SoundBlock name="Machete" img={Machete} type="weapons" />
        <SoundBlock name="Molotov" img={Molotov} type="weapons" />
        <SoundBlock name="Pan" img={Pan} type="weapons" />
        <SoundBlock name="Pistol" img={Pistol} type="weapons" />
        <SoundBlock name="Rifle" img={Rifle} type="weapons" />
        <SoundBlock name="SawedOff" img={SawedOff} type="weapons" />
        <SoundBlock name="Shotgun" img={Shotgun} type="weapons" />
        <SoundBlock name="SubMG" img={SubMG} type="weapons" />
      </SelectorArea> */}
    </CharacterSheet>
  );
};

export default PlayersSection;
