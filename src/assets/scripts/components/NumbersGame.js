import Inferno from 'inferno';
import Component from 'inferno-component';
import { noop } from 'lodash';
import Console from 'components/Console';
import Draggable from 'components/Draggable';
import Slot from 'components/Slot';
import Tile from 'components/Tile';


export default class NumbersGame extends Component {

  state = {
    dragTarget: null,
    dropTarget: null,
  };

  onDragStart = dragTarget => {
    this.setState({ dragTarget });
  };

  onDragEnter = dropTarget => {
    this.setState({ dropTarget });
  };

  onDragLeave = () => {
    this.setState({ dropTarget: null });
  };

  onDragEnd = () => {
    const { dragTarget, dropTarget } = this.state;
    this.setState({ dropTarget: null, dragTarget: null });
    if (dropTarget != null) {
      this.props.actions.placeTile(dragTarget, dropTarget);
    }
  };

  render() {
    const { equations, tiles, target } = this.props;
    const { dragTarget, dropTarget } = this.state;
    let onDragEnter = noop;
    let onDragLeave = noop;
    let slotClassName;
    if (dragTarget != null) {
      onDragEnter = this.onDragEnter;
      onDragLeave = this.onDragLeave;
      slotClassName = 'slot--receptive';
    }
    return (
      <div>
        <div className="typ typ--alignCenter">
          <div className="typ typ--uppercase typ--0.75x typ--inception2x">Make this</div>
          <div className="vr vr--1x"></div>
          <div className="aligner aligner--alignCenter">
            <Console message={target} />
          </div>
        </div>

        <div className="vr vr--4x"></div>
        <div className="typ typ--alignCenter typ--uppercase typ--0.75x typ--inception2x">
          With these
        </div>
        <div className="vr vr--2x"></div>

        <ul className="aligner aligner--gutters">
          {tiles.map((tile, i) => {
            const isUsed = equations.some(equation => equation.includes(tile));
            return (
              <li className="aligner__item">
                <Slot value={tile.value}>
                  {(!isUsed) && (
                    <Draggable
                      onDragStart={this.onDragStart.bind(this, tile)}
                      onDragEnd={this.onDragEnd}
                    >
                      {draggable => (
                        <Tile
                          value={tile.value}
                          onMouseDown={draggable.onMouseDown}
                          style={(!draggable.state.isDragging) ? null : {
                            left:   draggable.state.left,
                            top:    draggable.state.top,
                            pointerEvents: 'none',
                            zIndex: 1,
                          }}
                        />
                      )}
                    </Draggable>
                  )}
                </Slot>
              </li>
            );
          })}
        </ul>

        <div className="vr vr--2x"></div>

        <ul>
          {equations.map((equation, i) => {
            const tileA = equation[0];
            const tileB = equation[1];
            return (
              <li>
                <ul className="aligner aligner--gutters">
                  <li className="aligner__item"></li>
                  <li className="aligner__item">
                    <Slot
                      className={(dropTarget === i * 2)
                        ? 'slot--receiving'
                        : slotClassName}
                      onMouseEnter={onDragEnter.bind(this, i * 2)}
                      onMouseLeave={onDragLeave.bind(this, i * 2)}
                    >
                      {(tileA != null) && (
                        <Draggable
                          onDragStart={this.onDragStart.bind(this, tileA)}
                          onDragEnd={this.onDragEnd}
                        >
                          {draggable => (
                            <Tile
                              value={tileA.value}
                              onMouseDown={draggable.onMouseDown}
                              style={(!draggable.state.isDragging) ? null : {
                                left:   draggable.state.left,
                                top:    draggable.state.top,
                                pointerEvents: 'none',
                                zIndex: 1,
                              }}
                            />
                          )}
                        </Draggable>
                      )}
                    </Slot>
                  </li>
                  <li className="aligner__item">
                    ÷
                  </li>
                  <li className="aligner__item">
                    <Slot
                      className={(dropTarget === i * 2 + 1)
                        ? 'slot--receiving'
                        : slotClassName}
                      onMouseEnter={onDragEnter.bind(this, i * 2 + 1)}
                      onMouseLeave={onDragLeave.bind(this, i * 2 + 1)}
                    >
                      {(tileB != null) && (
                        <Draggable
                          onDragStart={this.onDragStart.bind(this, tileB)}
                          onDragEnd={this.onDragEnd}
                        >
                          {draggable => (
                            <Tile
                              value={tileB.value}
                              onMouseDown={draggable.onMouseDown}
                              style={(!draggable.state.isDragging) ? null : {
                                left:   draggable.state.left,
                                top:    draggable.state.top,
                                pointerEvents: 'none',
                                zIndex: 1,
                              }}
                            />
                          )}
                        </Draggable>
                      )}
                    </Slot>
                  </li>
                  <li className="aligner__item">=</li>
                  <li className="aligner__item"></li>
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
};
