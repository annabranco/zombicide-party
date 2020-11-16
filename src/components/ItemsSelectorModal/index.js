import React from 'react';
import { func } from 'prop-types';
import SelectionItem from '../ItemSelector';
import { WEAPONS } from '../../utils/itemsReference';
import { SelectorArea } from '../areas/styles';
import { SelectorModal } from './styles';

const ItemsSelectorModal = ({ changeWeapon }) => (
  <SelectorModal>
    <SelectorArea columns={6}>
      <SelectionItem
        name={WEAPONS.BaseballBat.name}
        img={WEAPONS.BaseballBat.img}
        onSelect={changeWeapon}
        type="weapons"
      />
      <SelectionItem
        name={WEAPONS.Chainsaw.name}
        img={WEAPONS.Chainsaw.img}
        onSelect={changeWeapon}
        type="weapons"
      />
      <SelectionItem
        name={WEAPONS.Crowbar.name}
        img={WEAPONS.Crowbar.img}
        onSelect={changeWeapon}
        type="weapons"
      />
      <SelectionItem
        name={WEAPONS.EvilTwins.name}
        img={WEAPONS.EvilTwins.img}
        onSelect={changeWeapon}
        type="weapons"
      />
      <SelectionItem
        name={WEAPONS.FireAxe.name}
        img={WEAPONS.FireAxe.img}
        onSelect={changeWeapon}
        type="weapons"
      />
      <SelectionItem
        name={WEAPONS.Katana.name}
        img={WEAPONS.Katana.img}
        onSelect={changeWeapon}
        type="weapons"
      />
      <SelectionItem
        name={WEAPONS.MasShotgun.name}
        img={WEAPONS.MasShotgun.img}
        onSelect={changeWeapon}
        type="weapons"
      />
      <SelectionItem
        name={WEAPONS.Machete.name}
        img={WEAPONS.Machete.img}
        onSelect={changeWeapon}
        type="weapons"
      />
      <SelectionItem
        name={WEAPONS.Molotov.name}
        img={WEAPONS.Molotov.img}
        onSelect={changeWeapon}
        type="weapons"
      />
      <SelectionItem
        name={WEAPONS.Pan.name}
        img={WEAPONS.Pan.img}
        onSelect={changeWeapon}
        type="weapons"
      />
      <SelectionItem
        name={WEAPONS.Pistol.name}
        img={WEAPONS.Pistol.img}
        onSelect={changeWeapon}
        type="weapons"
      />
      <SelectionItem
        name={WEAPONS.Rifle.name}
        img={WEAPONS.Rifle.img}
        onSelect={changeWeapon}
        type="weapons"
      />
      <SelectionItem
        name={WEAPONS.SawedOff.name}
        img={WEAPONS.SawedOff.img}
        onSelect={changeWeapon}
        type="weapons"
      />
      <SelectionItem
        name={WEAPONS.Shotgun.name}
        img={WEAPONS.Shotgun.img}
        onSelect={changeWeapon}
        type="weapons"
      />
      <SelectionItem
        name={WEAPONS.SubMG.name}
        img={WEAPONS.SubMG.img}
        onSelect={changeWeapon}
        type="weapons"
      />
    </SelectorArea>
  </SelectorModal>
);

ItemsSelectorModal.propTypes = {
  changeWeapon: func.isRequired
};

export default ItemsSelectorModal;
