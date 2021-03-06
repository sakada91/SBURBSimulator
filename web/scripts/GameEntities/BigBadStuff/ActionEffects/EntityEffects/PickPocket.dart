import "../../../../SBURBSim.dart";
import 'dart:html';

//no chance to survive, no strife no anything. it's a red miles situation
//not really any details, or modifiers
class PickPocket extends EffectEntity {
    @override
    String name = "PickPocket";
    PickPocket(SerializableScene scene) : super(scene);

  @override
  void syncFormToMe() {
    ////does nothing since i have no personal data
  }

    @override
    void renderForm(Element divbluh) {
        setupContainer(divbluh);

        DivElement me = new DivElement();
        container.append(me);
        me.setInnerHtml("<b>PickPocket:</b> <br>take one item at random from a target's inventory.<br><br>");
        syncToForm();
    }

  @override
  void syncToForm() {
      scene.syncForm();
  }
  @override
  void effectEntities(GameEntity effector,List<GameEntity> entities) {
      String text = "";

      entities.forEach((GameEntity e) {
          Item chosen = scene.session.rand.pickFrom(e.sylladex.inventory);
          if(chosen != null) {
              text = "$text ${e.htmlTitle()} loses ${chosen} from their inventory. ${scene.gameEntity} now owns it.";
              scene.gameEntity.sylladex.add(chosen);
          }else {
              text = "$text ${scene.gameEntity.htmlTitle()} can find nothing to take from ${e.htmlTitle()}.";
          }
      });

      ButtonElement toggle = new ButtonElement()..text = "Show Details?";
      scene.myElement.append(toggle);

      DivElement div = new DivElement()..setInnerHtml(text);
      div.style.display = "none";
      scene.myElement.append(div);

      toggle.onClick.listen((Event e) {
          if(div.style.display == "none") {
              toggle.text = "Hide Details?";
              div.style.display = "block";
          }else {
              toggle.text = "Show Details?";
              div.style.display = "none";
          }
      });

  }
  @override
  ActionEffect makeNewOfSameType() {
    return new PickPocket(scene);
  }
}