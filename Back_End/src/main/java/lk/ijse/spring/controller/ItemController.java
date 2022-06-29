package lk.ijse.spring.controller;

import lk.ijse.spring.dto.ItemDTO;
import lk.ijse.spring.service.ItemService;
import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

/**
 * @author : M-Prageeth
 * @created : 25/06/2022 - 9:22 AM
 **/
@RestController
@RequestMapping("api/v1/item")
@CrossOrigin
public class ItemController {

    @Autowired
    ItemService itemService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllItems() {
        return new ResponseUtil(200, "OK", itemService.getAllItems());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil saveItem(ItemDTO item) {
        itemService.saveItem(item);
        return new ResponseUtil(200, "Saved", null);
    }

    @GetMapping(path = "/{code}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil searchItem(@PathVariable String code) {
        return new ResponseUtil(200, "OK", itemService.searchItem(code));
    }

    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil updateItem(@RequestBody ItemDTO item) {
        itemService.updateItem(item);
        return new ResponseUtil(200, "Updated", null);
    }

    @DeleteMapping(params = {"code"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil deleteItem(@RequestParam String code) {
        itemService.deleteItem(code);
        return new ResponseUtil(200, "Deleted", null);
    }

    @GetMapping(path = "/generateItemCode")
    public ResponseUtil generateItemCode(){
        return new ResponseUtil(200,"OK",itemService.generateItemCode());
    }
}
