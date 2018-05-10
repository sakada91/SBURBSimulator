import '../../SBURBSim.dart';
import "dart:html";
import "dart:async";


//lists all carapaces, lets you activate them or not
class ItemSection {
    Session session;
    Element container;
    //if you make a new item, it's that, else it's what was selected in form
    //guaranteed to be a copy
    Item selectedItem;
    ItemSection(Session this.session, Element parentContainer) {
        container = new DivElement();
        container.classes.add("itemSection");
        parentContainer.append(container);
        draw();
    }

    void draw() {
        container.setInnerHtml("Select Items (to give to players and carapaces)<br>");
        SelectElement select = new SelectElement();
        container.append(select);
        select.size = 13;
        for(Item item in  Item.allUniqueItems) {
            OptionElement option = new OptionElement();
            option.text = item.baseName;
            option.value = "${Item.allUniqueItems.indexOf(item)}";
            select.append(option);
        }
        select.options.first.selected = true;

        select.onChange.listen((Event e) {
            selectedItem =Item.allUniqueItems[int.parse(select.options[select.selectedIndex].value)].copy();
        });
    }


}