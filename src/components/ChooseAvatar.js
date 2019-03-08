import React, { Component } from "react";
class ChooseAvatar extends Component {
  state = {
    hairStyle: "LongHairNotTooLong",
    accessories: "Blank",
    hairColour: "Brown",
    facialHair: "Blank",
    skinColour: "Light",
    avatarURL: ""
  };
  render() {
    const { setURL } = this.props;
    const {
      hairStyle,
      accessories,
      hairColour,
      facialHair,
      skinColour,
      avatarURL
    } = this.state;

    const SkinColour = [
      "Pale",
      "Black",
      "DarkBrown",
      "Brown",
      "Yellow",
      "Tanned"
    ];

    const FacialHair = [
      "Blank",
      "BeardMedium",
      "BeardLight",
      "BeardMagestic",
      "MoustacheMagnum",
      "MoustacheFancy"
    ];

    const HairColour = [
      "Black",
      "Brown",
      "BlondeGolden",
      "Auburn",
      "SilverGray",
      "Red",
      "PastelPink"
    ];

    const HairStyle = [
      "LongHairCurvy",
      "ShortHairShortCurly",
      "LongHairNotTooLong",
      "ShortHairShortWaved"
    ];

    const Accessories = ["Blank", "Prescription02", "Sunglasses", "Round"];

    return (
      <div>
        <form
          onSubmit={event => {
            event.preventDefault();
            setURL(
              hairStyle,
              accessories,
              hairColour,
              facialHair,
              skinColour,
              avatarURL
            );
          }}
        >
          <label>Choose your hair style</label>
          <select name="hairStyle" id="hairStyle" onChange={this.handleChange}>
            {HairStyle.map(style => {
              return (
                <option key={style} value={style}>
                  {style}
                </option>
              );
            })}
          </select>
          <br />
          <label>Accessories</label>
          <select
            name="accessories"
            id="accessories"
            onChange={this.handleChange}
          >
            {Accessories.map(accessorie => {
              return (
                <option key={accessorie} value={accessorie}>
                  {accessorie}
                </option>
              );
            })}
          </select>
          <br />
          <label>Hair colour</label>
          <select
            name="hairColour"
            id="hairColour"
            onChange={this.handleChange}
          >
            {HairColour.map(colour => {
              return (
                <option key={colour} value={colour}>
                  {colour}
                </option>
              );
            })}
          </select>
          <br />
          <label>Facial hair</label>
          <select
            name="facialHair"
            id="facialHair"
            onChange={this.handleChange}
          >
            {FacialHair.map(face => {
              return (
                <option key={face} value={face}>
                  {face}
                </option>
              );
            })}
          </select>
          <br />
          <label>Skin colour</label>
          <select
            name="skinColour"
            id="skinColour"
            onChange={this.handleChange}
          >
            {SkinColour.map(skin => {
              return (
                <option key={skin} value={skin}>
                  {skin}
                </option>
              );
            })}
          </select>
          <button type="submit">Create!</button>
        </form>
      </div>
    );
  }

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };
}

export default ChooseAvatar;
