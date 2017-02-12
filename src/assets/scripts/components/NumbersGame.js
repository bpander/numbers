import Inferno from 'inferno';
import Component from 'inferno-component';
import { noop } from 'lodash';
import Console from 'components/Console';
import Draggable from 'components/Draggable';
import Droppable from 'components/Droppable';
import Slot from 'components/Slot';
import Tile from 'components/Tile';


export default class NumbersGame extends Component {

  state = {
    isDragging: false,
    dragTarget: null,
    dropTarget: null,
  };

  onDragStart = target => this.setState({ isDragging: true, dragTarget: target });

  onDragEnd = () => {
    const { dragTarget, dropTarget } = this.state;
    this.setState({ isDragging: false, dragTarget: null, dropTarget: null });
    if (dropTarget != null) {
      this.props.actions.placeTile(dragTarget, dropTarget);
    }
  };

  onDropEnter = target => this.setState({ dropTarget: target });

  onDropLeave = () => this.setState({ dropTarget: null });

  render() {
    const { equations, tiles, target } = this.props;
    const { dragTarget, dropTarget, isDragging } = this.state;
    const slotClassName = (isDragging) ? 'slot--receptive' : '';

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
                          onTouchStart={draggable.onMouseDown}
                          style={(tile === dragTarget)
                            ? {
                              transform: `translate3d(
                                ${draggable.state.left}px,
                                ${draggable.state.top}px,
                                0
                              )`,
                              zIndex: 1,
                            }
                            : null
                          }
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
                    <Droppable
                      isDragging={this.state.isDragging}
                      onDropEnter={this.onDropEnter.bind(this, i * 2)}
                      onDropLeave={this.onDropLeave}
                    >
                      {droppable => (
                        <Slot
                          className={(dropTarget === i * 2)
                            ? 'slot--receiving'
                            : slotClassName}
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
                                  onTouchStart={draggable.onMouseDown}
                                  style={(tileA === dragTarget)
                                    ? {
                                      transform: `translate3d(
                                        ${draggable.state.left}px,
                                        ${draggable.state.top}px,
                                        0
                                      )`,
                                      zIndex: 1,
                                    }
                                    : null
                                  }
                                />
                              )}
                            </Draggable>
                          )}
                        </Slot>
                      )}
                    </Droppable>
                  </li>
                  <li className="aligner__item">
                    ÷
                  </li>
                  <li className="aligner__item">
                    <Droppable
                      isDragging={this.state.isDragging}
                      onDropEnter={this.onDropEnter.bind(this, i * 2 + 1)}
                      onDropLeave={this.onDropLeave}
                    >
                      {droppable => (
                        <Slot
                          className={(dropTarget === i * 2 + 1)
                            ? 'slot--receiving'
                            : slotClassName}
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
                                  onTouchStart={draggable.onMouseDown}
                                  style={(tileB === dragTarget)
                                    ? {
                                      transform: `translate3d(
                                        ${draggable.state.left}px,
                                        ${draggable.state.top}px,
                                        0
                                      )`,
                                      zIndex: 1,
                                    }
                                    : null
                                  }
                                />
                              )}
                            </Draggable>
                          )}
                        </Slot>
                      )}
                    </Droppable>
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
