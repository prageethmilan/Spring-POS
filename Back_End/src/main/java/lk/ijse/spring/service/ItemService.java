package lk.ijse.spring.service;

import lk.ijse.spring.dto.ItemDTO;

import java.util.List;

/**
 * @author : M-Prageeth
 * @created : 25/06/2022 - 9:25 AM
 **/
public interface ItemService {
    void saveItem(ItemDTO dto);

    void updateItem(ItemDTO dto);

    void deleteItem(String code);

    ItemDTO searchItem(String code);

    List<ItemDTO> getAllItems();

    String generateItemCode();
}
