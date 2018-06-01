import "../../../../SBURBSim.dart";
import 'dart:html';

//has no sub form, just exists
class TargetIsFromSessionWithSickFires extends TargetConditionLiving {
    @override
    String name = "TargetIsFromSessionWithSickFires";

    Item crown;

    @override
    String get importantWord => "N/A";

    @override
    String descText = "<b>Is Alive:</b><br>Target Entity must be from a session with Sick Fires (but isn't necessarily the rapper in question.). <br><br>";
    @override
    String notDescText = "<b>Is NOT Alive:</b><br>Target Entity must be NOT from a session with Sick Fires. <br><br>";

    //strongly encouraged for this to be replaced

    TargetIsFromSessionWithSickFires(SerializableScene scene) : super(scene){
    }




    @override
    TargetCondition makeNewOfSameType() {
        return new TargetIsFromSessionWithSickFires(scene);
    }

    @override
    void syncFormToMe() {
        syncFormToNotFlag();
    }

    @override
    void syncToForm() {
        syncNotFlagToForm();
        scene.syncForm();
    }
    @override
    void copyFromJSON(JSONObject json) {
        //nothing to do
    }

    @override
    bool conditionForFilter(GameEntity item) {
        return item.dead;
    }
}